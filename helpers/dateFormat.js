module.exports = {
    formatDate: function (date) {
        return new Date(date).toLocaleDateString().slice(0, 16).replace("T", " ");
    }
}
