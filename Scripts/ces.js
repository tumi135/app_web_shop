if (que.state != 'all') {
    list = list.filter(function(item) {
        return item.state == que.state;
        return item.state.indexOf(que.state) !== -1
    })
}
if (que.value) {
    list = list.filter(function(item) {
        return item.text.indexOf(que.value) !== -1
    })
}
