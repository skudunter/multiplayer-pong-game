let gen = () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)];

const createparty = () => {
    let code = gen() + gen() + gen() + gen();
    location.pathname = '/';
    location.search = `?game=${code}`;
};

const joinparty = () => {
    let code = document.querySelector('#code');
    location.pathname = '/';
    location.search = `?game=${code}`;
}