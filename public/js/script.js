const registerBtn = document.getElementById('register');

registerBtn.addEventListener('click', (e) => {
  const name = prompt('선수 이름을 입력하세요.');
  if (name.length === 0) {
    alert('이름을 다시 입력해주세요.');
  } else {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/player');
    document.charset = 'utf-8';

    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'name');
    input.setAttribute('value', name);
    form.appendChild(input);

    document.body.appendChild(form);

    form.submit();
    document.body.removeChild(form);
  }
});
