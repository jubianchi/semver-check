import { createHashHistory } from 'history';

export default createHashHistory({
    hashType: 'slash',
    basename: `${process.env.PUBLIC_URL}/`,
});
