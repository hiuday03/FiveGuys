function showForm(formName) {
    var forms = document.getElementsByClassName('editprofile');
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }

    forms = document.getElementsByClassName('editaccount');
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }

    forms = document.getElementsByClassName('editpass');
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }

    var form = document.querySelector('.' + formName);
    if (form) {
        form.style.display = 'block';
    }
}