/***
 * @time 2019.12.11
 * 树形结构相关辅助函数
 */

/***
 * 平铺树形结构
 * @param result 接收结果
 * @param tree 需要平铺的数据
 * @param pid 父级id
 * @constructor
 * @return []
 */
const TileTool = (result, tree, pid) => {
    tree.forEach(d => {
        let obj={parentId: pid, id: d.id, name: d.name, checked: d.checked, open: d.open, disabled: d.disabled?d.disabled:false};
        result.push(obj);
        if (d.children&&d.children.length) TileTool(result, d.children, d.id);
    });

    return result;
};

/**
 * 组装数据成树形结构
 * @param tile 平铺原始数据
 * @constructor
 */
const PackageTool = (tile) => {
    let result = [];
    if(!Array.isArray(tile)) return result;
    tile.forEach(item => {
        delete item.children;
    });
    let map = ToMapObj(tile);
    tile.forEach(item => {
        let parent = map.get(item.parentId);
        if(parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

/**
 * 将数据转成map对象
 * @param tile
 * @constructor
 */
const ToMapObj = (tile) => {
    let map=new Map(); // map对象
    tile.forEach(d => {
        if (!map.has(d.id)) map.set(d.id, d)
    });
    return map;
};

/**
 * 得到筛选后的数据 一维数据列表
 * @param tile 平铺原始数据
 * @param fData 筛选后的数据
 * @constructor
 */
const FilterTool = (tile, fData) => {
    let data=[]; // 接收结果
    const tupleObj=ToMapObj(tile); // 平铺的map对象
    ByExample(data, fData, tupleObj);

    return data;
};

/**
 * 得到筛选后的数据 树形结构
 * @param tile 平铺原始数据
 * @param fData 筛选后的数据
 * @constructor
 */
const FilterTreeTool = (tile, fData) => {
    let data=[]; // 接收结果
    const tupleObj=ToMapObj(tile); // 平铺的map对象
    ByExampleTree(data, fData, tupleObj);
    return PackageTool(Unique(data.flat()));
};

/**
 * 遍历传入的筛选后的数据
 * @param data 接收结果
 * @param tile 平铺的数据
 * @param tupleObj 平铺的map对象
 */
const ByExample = (data, tile, tupleObj) => {
    tile.forEach(d => {
        const dArr=[d];
        GetObjByParentId(dArr, d, tupleObj);
        data.push(FormatArr(dArr))
    });
};
const ByExampleTree = (data, tile, tupleObj) => {
    tile.forEach(d => {
        const dArr=[d];
        GetObjByParentId(dArr, d, tupleObj);
        data.push(dArr)
    });
};

/**
 * 递归查找上级数据 直到顶级
 * @param dArr
 * @param d
 * @param tupleObj
 */
const GetObjByParentId = (dArr, d, tupleObj) => {
    const obj=tupleObj.get(d.parentId);
    if (obj) {
        dArr.push(obj);
        GetObjByParentId(dArr, obj, tupleObj)
    }
};

/**
 * 把筛选到数组格式化成字符串对象
 * @param arr
 * @return {{name: string, id: string}}
 * lId 末级数据id
 * lName 末级数据name
 */
const FormatArr = (arr) => {
    let id='', name='', lId='', lName='', selected=null;
    for (let l=arr.length, i=l-1; i>=0; i--) {
        id+=arr[i].id+'/';
        name+=arr[i].name+'/';
        if (i === 0) {
            lId=arr[0].id;
            lName=arr[0].name.replace(/<[^<>]+>/g, '');
            selected=arr[0].checked==='checked';
        }
    }
    if (id) id=id.substring(0, id.length-1);
    if (name) name=name.substring(0, name.length-1);

    return {id, name, lId, lName, selected}
};

/**
 * 复杂数组去重
 * @param arr
 * @return {*}
 */
const Unique=(arr) => {
    const res = new Map();
    return arr.filter(d => !res.has(d.id) && res.set(d.id, d.name))
};

/**
 * 改变tree的checked状态
 * @param data
 * @return {string}
 * @constructor
 */
const ChangeStatus = (data) => {
    let checked='';
    if (data.every(d => d.checked==='checked')) {
        checked = 'checked';
    } else if (data.every(d => d.checked==='uncheck')) {
        checked = 'uncheck';
    } else {
        checked = 'notNull';
    }

    return checked;
};

/**
 * 通过父级id查找子级数据
 * @param result 结果
 * @param pid 父级id
 * @param tile 平铺数据
 * @constructor
 */
const GetIdByParentId = (result, pid, tile) => {
    tile.forEach(d => {
        if (d.parentId === pid) {
            result.push(d.id);
            GetIdByParentId(result, d.id, tile);
        }
    });

    return result;
};
/**
 * 通过子级id查找父级数据
 * @param result 结果
 * @param id 子级id
 * @param tile 平铺数据
 * @constructor
 */
const GetParentIdById = (result, id, tile) => {
    tile.forEach(d => {
        if (d.id === id) {
            result.push(d.parentId);
            GetParentIdById(result, d.parentId, tile);
        }
    });

    return result;
};

export {
    TileTool,
    FilterTool,
    PackageTool,
    FilterTreeTool,
    Unique,
    ChangeStatus,
    GetIdByParentId,
    GetParentIdById
};