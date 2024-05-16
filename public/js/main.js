function showEditForm(id) {
    if (document.getElementById('edit-form-' + id).style.display === 'block') {
        document.getElementById('edit-form-' + id).style.display = 'none';
        return;
    }
    document.getElementById('edit-form-' + id).style.display = 'block';
}
