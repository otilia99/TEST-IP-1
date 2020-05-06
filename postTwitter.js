var image_url;
img_url = 'https://api.imgur.com/3/image';

var image = document.getElementById("myImage").files[0];
let fd = new FormData();
fd.append('image', image);

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', img_url);
xhr.setRequestHeader('Authorization', 'Client-ID a8a4a5ed7327935');