// ToolGood.Words.StringSearch.js
// 2020, Lin Zhijun, https://github.com/toolgood/ToolGood.Words
// Licensed under the Apache License 2.0
// 更新日志
// 2020.05.17 修改，支持大于0xffff的字符

function StringSearch () {
    function TrieNode () {
        this.Index = 0;
        this.Layer = 0;
        this.End = false;
        this.Char = '';
        this.Results = [];
        this.m_values = {};
        this.Failure = null;
        this.Parent = null;

        this.Add = function (c) {
            if (this.m_values[c] != null) {
                return this.m_values[c];
            }
            let node = new TrieNode();
            node.Parent = this;
            node.Char = c;
            this.m_values[c] = node;
            return node;
        }

        this.SetResults = function (index) {
            if (this.End == false) {
                this.End = true;
            }
            this.Results.push(index)
        }
    }
    function TrieNode2 () {
        this.End = false;
        this.Results = [];
        this.m_values = {};
        this.minflag = 0xffff;
        this.maxflag = 0;

        this.Add = function (c, node3) {
            if (this.minflag > c) { this.minflag = c; }
            if (this.maxflag < c) { this.maxflag = c; }
            this.m_values[c] = node3;
        }
        this.SetResults = function (index) {
            if (this.End == false) {
                this.End = true;
            }
            if (this.Results.indexOf(index) == -1) {
                this.Results.push(index);
            }
        }
        this.HasKey = function (c) {
            return this.m_values[c] != undefined;
        }
        this.TryGetValue = function (c) {
            if (this.minflag <= c && this.maxflag >= c) {
                return this.m_values[c];
            }
            return null;
        }
    }

    let _first = [];
    let _keywords = [];

    /**
     * 设置关键字
     * @param {any} keywords
     */
    this.SetKeywords = function (keywords) {
        _keywords = keywords;
        SetKeywords2();
    }
    function SetKeywords2 () {
        let root = new TrieNode();

        let allNodeLayer = {};
        for (let i = 0; i < _keywords.length; i++) {
            let p = _keywords[i];
            let nd = root;
            for (let j = 0; j < p.length; j++) {
                nd = nd.Add(p.charCodeAt(j));
                if (nd.Layer == 0) {
                    nd.Layer = j + 1;
                    if (allNodeLayer[nd.Layer]) {
                        allNodeLayer[nd.Layer].push(nd)
                    } else {
                        allNodeLayer[nd.Layer] = [];
                        allNodeLayer[nd.Layer].push(nd)
                    }
                }
            }
            nd.SetResults(i);
        }

        let allNode = [];
        allNode.push(root);
        for (let key in allNodeLayer) {
            let nds = allNodeLayer[key];
            for (let i = 0; i < nds.length; i++) {
                allNode.push(nds[i]);
            }
        }
        allNodeLayer = null;

        for (let i = 1; i < allNode.length; i++) {
            let nd = allNode[i];
            nd.Index = i;
            let r = nd.Parent.Failure;
            let c = nd.Char;
            while (r != null && !r.m_values[c])
                r = r.Failure;
            if (r == null)
                nd.Failure = root;
            else {
                nd.Failure = r.m_values[c];
                for (let key2 in nd.Failure.Results) {
                    if (Object.prototype.hasOwnProperty.call(nd.Failure.Results, key2) == false) { continue; }
                    let result = nd.Failure.Results[key2];
                    nd.SetResults(result);
                }
            }
        }
        root.Failure = root;

        let allNode2 = [];
        for (let i = 0; i < allNode.length; i++) {
            allNode2.push(new TrieNode2());
        }
        for (let i = 0; i < allNode2.length; i++) {
            let oldNode = allNode[i];
            let newNode = allNode2[i];

            for (let key in oldNode.m_values) {
                if (Object.prototype.hasOwnProperty.call(oldNode.m_values, key == false)) { continue; }
                let index = oldNode.m_values[key].Index;
                newNode.Add(key, allNode2[index]);
            }
            for (let index = 0; index < oldNode.Results.length; index++) {
                let item = oldNode.Results[index];
                newNode.SetResults(item);
            }
            oldNode = oldNode.Failure;
            while (oldNode != root) {
                for (let key in oldNode.m_values) {
                    if (Object.prototype.hasOwnProperty.call(oldNode.m_values, key == false)) { continue; }
                    if (newNode.HasKey(key) == false) {
                        let index = oldNode.m_values[key].Index;
                        newNode.Add(key, allNode2[index]);
                    }
                }
                for (let index = 0; index < oldNode.Results.length; index++) {
                    let item = oldNode.Results[index];
                    newNode.SetResults(item);
                }
                oldNode = oldNode.Failure;
            }
        }
        allNode = null;
        root = null;

        // let first = [];
        // for (let index = 0; index < 0xffff; index++) {
        //     first.push(null);
        // }
        // for (let key in allNode2[0].m_values) {
        //     if (allNode2[0].m_values.hasOwnProperty(key) == false) { continue; }
        //     first[key] = allNode2[0].m_values[key];
        // }
        _first = allNode2[0];
    }
    /**
     * 查找第一个匹配 字符串
     * @param {any} text
     */
    this.FindFirst = function (text) {
        let ptr = null;
        for (let index = 0; index < text.length; index++) {
            let t = text.charCodeAt(index);
            let tn = null;
            if (ptr == null) {
                tn = _first.TryGetValue(t);
            } else {
                tn = ptr.TryGetValue(t);
                if (!tn) {
                    tn = _first.TryGetValue(t);
                }
            }
            if (tn != null) {
                if (tn.End) {
                    return _keywords[tn.Results[0]];
                }
            }
            ptr = tn;
        }
        return null;
    }

    /**
     * 查找所有匹配 字符串
     * @param {any} text
     */
    this.FindAll = function (text) {
        let ptr = null;
        let list = [];

        for (let index = 0; index < text.length; index++) {
            let t = text.charCodeAt(index);
            let tn = null;
            if (ptr == null) {
                tn = _first.TryGetValue(t);
            } else {
                tn = ptr.TryGetValue(t);
                if (!tn) {
                    tn = _first.TryGetValue(t);
                }
            }
            if (tn != null) {
                if (tn.End) {
                    for (let j = 0; j < tn.Results.length; j++) {
                        let item = tn.Results[j];
                        list.push(_keywords[item]);
                    }
                }
            }
            ptr = tn;
        }
        return list;
    }

    /**
     * 检查是否包含
     * @param {any} text
     */
    this.ContainsAny = function (text) {
        let ptr = null;
        for (let index = 0; index < text.length; index++) {
            let t = text.charCodeAt(index);
            let tn = null;
            if (ptr == null) {
                tn = _first.TryGetValue(t);
            } else {
                tn = ptr.TryGetValue(t);
                if (!tn) {
                    tn = _first.TryGetValue(t);
                }
            }
            if (tn != null) {
                if (tn.End) {
                    return true;
                }
            }
            ptr = tn;
        }
        return false;
    }

    /**
     * 查找所有匹配全部替换
     * @param {any} text
     * @param {any} replaceChar
     */
    this.Replace = function (text, replaceChar) {
        if (replaceChar == undefined) {
            replaceChar = '*'
        }

        let result = text.split('');

        let ptr = null;
        for (let i = 0; i < text.length; i++) {
            let t = text.charCodeAt(i);

            let tn = null;
            if (ptr == null) {
                tn = _first.TryGetValue(t);
            } else {
                tn = ptr.TryGetValue(t);
                if (!tn) {
                    tn = _first.TryGetValue(t);
                }
            }
            if (tn != null) {
                if (tn.End) {
                    let maxLength = _keywords[tn.Results[0]].length;
                    let start = i + 1 - maxLength;
                    for (let j = start; j <= i; j++) {
                        result[j] = replaceChar;
                    }
                }
            }
            ptr = tn;
        }
        return result.join("");
    }
}

export default StringSearch
