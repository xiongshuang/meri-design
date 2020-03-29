import MeriDesign from '../../dist/index';
import '../../dist/index.css';
import './styles/table.styl';

export default ({
    Vue
}) => {
    Vue.use(MeriDesign);
    console.log(
        '%c Meri-design %c Version 1.0.0-beta2 ',
        'background-color: #0091ff; border-top-left-radius: 2px; border-bottom-left-radius: 2px; line-height: 20px; color: #fff; font-size: 12px;',
        'background-color: #454d54; border-top-right-radius: 2px; border-bottom-right-radius: 2px; line-height: 20px; color: #fff; font-size: 12px;'
    );
}