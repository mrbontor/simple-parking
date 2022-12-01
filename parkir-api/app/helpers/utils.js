/**
 * [formatRupiah using ext 00 or not]
 *
 * if TRUE [RP 100.000.00] else [RP 100.000]
 *
 * @param  {[type]}  number        [description]
 * @param  {Boolean} [type=false] [default]
 * @return {[type]}               [description]
 */
const formatRupiah = (angka, type = false) => {
    let ext = '';
    if (type) ext = '.00';
    let reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return `RP ${ribuan}` + ext;
};

const timeLeft = (startDate, endDate) => {
    const dayjs = require('dayjs');

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    
    const diff = end.diff(start, 'second')
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor((diff / 1000) / 60);
    const hours   = Math.floor(minutes / 60);
    const days =  end.diff(start, 'day');
    
    return { days, hours, minutes, seconds}
}



module.exports = {
    TimeLeft: timeLeft,
    FormatRupiah: formatRupiah
};
