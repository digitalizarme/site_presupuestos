import moment from 'moment';

const formatarFecha = (cell) => {
  return moment.utc(cell).local().format('DD/MM/YYYY HH:mm:ss');
};

export default formatarFecha;
