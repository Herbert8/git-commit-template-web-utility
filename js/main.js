(function () {

    var dataObj = {
        changeType: 'feat',
        changeScope: '',
        shortDesc: '',
        jiraIssueID: '',
        longDesc: '',
        breakingChanges: '',
        closedIssues: ''
    };

    var vm = new Vue({
        el: '#app',
        data: dataObj,
        methods: {
            copyToClipboard() {
                // alert(Clipboard);
                // alert('abc');
                navigator.clipboard.writeText(this.commitMessage).then(function () {
                    /* clipboard successfully set */
                    alert('已复制')
                }, function () {
                    /* clipboard write failed */
                    alert('复制失败')
                });
            }
        },
        computed: {
            changeScopeDisplay() {
                return this.changeScope.trim() === '' ? '' : '(' + this.changeScope + ')'
            },
            breakingChangesDisplay() {
                return this.breakingChanges.trim() === '' ? '' : 'BREAKING CHANGE: ' + this.breakingChanges
            },
            closedIssuesDisplay() {
                var retStr = '';
                if (this.closedIssues.trim() != '') {
                    var issueArr = this.closedIssues.split(',')
                    issueArr.forEach(element => {
                        retStr += '\nCloses #' + element;
                    });
                }
                return retStr;
            },
            jiraIssueIDDisplay() {
                return this.jiraIssueID.trim() === '' ? '#NONE-0' : this.jiraIssueID;
            },
            commitMessage() {
                var commitMsg = `${this.changeType}${this.changeScopeDisplay}: ${this.shortDesc} ${this.jiraIssueIDDisplay}

${this.longDesc}

${this.breakingChangesDisplay}
${this.closedIssuesDisplay}
`
                return commitMsg.trim();
            }
        }
    });


})()