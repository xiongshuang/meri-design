class CountYear {
    constructor(Y) {
        Y?this.Y=Y:this.Y=this.countNowYear();

        this.yearsArray=[]; // 当前年数组
    }

    /**
     * 获取当前年
     * @return {string}
     */
    countNowYear() {
        const date=new Date();
        return date.getFullYear().toString();
    }

    getYearsArray() {
        const Y=parseInt(this.Y);
        let arr=[];
        for (let i=11; i>0; i--) {
            arr.push({year: (Y-i).toString(), selected: '', multiple: ''})
        }
        const res=[...arr, {year: Y.toString(), selected: '', multiple: ''}];
        this.yearsArray=res;
        return res;
    }
}

export default CountYear;