// 左侧菜单显示数据
export const menuData ={
  code: 200,
  message: '操作成功',
  result: [
    {
      id: '3dd722cc01954d089318437f8ac38006',
      parentId: '10000',
      children: [
        {
          id: '20c6d35b58284615bcdf8ab1924700aa',
          parentId: '3dd722cc01954d089318437f8ac38006',
          children: [
            {
              id: '666ea558037a4fedb3b89154905b9161',
              parentId: '20c6d35b58284615bcdf8ab1924700aa',
              children: null,
              name: '用户详情',
              sort: 1,
              parentIds:
                '0,,1,3dd722cc01954d089318437f8ac38006,20c6d35b58284615bcdf8ab1924700aa',
              href: '/srm/system/user/detail',
              target: null,
              icon: '',
              isShow: '0',
              permission: '',
              method: null,
              open: null,
              type: null
            }
          ],
          name: '用户管理',
          sort: 10,
          parentIds: '0,,1,3dd722cc01954d089318437f8ac38006',
          href: '/srm/system/user/list',
          target: null,
          icon: '',
          isShow: '1',
          permission: '',
          method: null,
          open: null,
          type: null
        },
        {
          id: '8071e970fd7f46868864308b865301b1',
          parentId: '3dd722cc01954d089318437f8ac38006',
          children: null,
          name: '菜单管理',
          sort: 20,
          parentIds: '0,,1,3dd722cc01954d089318437f8ac38006',
          href: '/srm/system/menu/list',
          target: null,
          icon: '',
          isShow: '1',
          permission: '',
          method: null,
          open: null,
          type: null
        },
        {
          id: '36fa0b7fbf09481992d3f50043d31084',
          parentId: '3dd722cc01954d089318437f8ac38006',
          children: null,
          name: '角色管理',
          sort: 30,
          parentIds: '0,,1,3dd722cc01954d089318437f8ac38006',
          href: '/srm/system/role/list',
          target: null,
          icon: '',
          isShow: '1',
          permission: '',
          method: null,
          open: null,
          type: null
        },
        {
          id: '6f8f84ecd151435fbc8bf983c228b391',
          parentId: '3dd722cc01954d089318437f8ac38006',
          children: null,
          name: '字典管理',
          sort: 40,
          parentIds: '0,,1,3dd722cc01954d089318437f8ac38006',
          href: '/srm/system/dict/list',
          target: null,
          icon: '',
          isShow: '1',
          permission: '',
          method: null,
          open: null,
          type: null
        }
      ],
      name: '系统设置',
      sort: 4000,
      parentIds: '0,,1',
      href: '/srm/system',
      target: null,
      icon: 'el-icon-s-home',
      isShow: '1',
      permission: '',
      method: null,
      open: null,
      type: null
    },
  ]
}

// 菜单管理数据
export const menuTree = {"code":200,"message":"操作成功","result":[{"id":"f8a744a78926475d95f586e8d00f5848","parentId":"10000","children":[{"id":"e055e0ad8e164911af87ec71502443b0","parentId":"f8a744a78926475d95f586e8d00f5848","children":null,"name":"实名认证","sort":10,"parentIds":"0,1,f8a744a78926475d95f586e8d00f5848,","href":"/srm/account/certification","target":"","icon":"","isShow":"1","permission":"","method":"GET","open":1,"type":0},{"id":"e7b830fbf23341ff899c1a3793e5b8d5","parentId":"f8a744a78926475d95f586e8d00f5848","children":null,"name":"合同管理","sort":20,"parentIds":"0,1,f8a744a78926475d95f586e8d00f5848,","href":"/srm/account/contract","target":"","icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"1157a41209054eec853294a4fcbe65d2","parentId":"f8a744a78926475d95f586e8d00f5848","children":null,"name":"供应商信息","sort":30,"parentIds":"0,1,f8a744a78926475d95f586e8d00f5848,","href":"/srm/account/baseInfo","target":"","icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"02531bafc3254da0b70a48affd333e6e","parentId":"f8a744a78926475d95f586e8d00f5848","children":null,"name":"设置入库通知","sort":100,"parentIds":"0,1,,f8a744a78926475d95f586e8d00f5848","href":"/srm/account/notice","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"我的账户","sort":100,"parentIds":"0,1,","href":"/srm/account","target":"","icon":"el-icon-user-solid","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"550801f7052b40849dc746ba4af5df8b","parentId":"10000","children":[{"id":"aa880ac4dab943fb932d43289782e878","parentId":"550801f7052b40849dc746ba4af5df8b","children":null,"name":"商品资质","sort":10,"parentIds":"0,,1,550801f7052b40849dc746ba4af5df8b","href":"/srm/goods/qualification","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"aaf2ea250cf948648b792c4051f65537","parentId":"550801f7052b40849dc746ba4af5df8b","children":null,"name":"商品资质编辑页","sort":11,"parentIds":"0,,1,550801f7052b40849dc746ba4af5df8b","href":"/srm/goods/qualificationStep","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"商品管理","sort":200,"parentIds":"0,,1","href":"/srm/goods/","target":null,"icon":"el-icon-grape","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"5eb044afc25d4349a3045fcb06ac11eb","parentId":"10000","children":[{"id":"3fd0313d9fb3455f9e3143a642a1e621","parentId":"5eb044afc25d4349a3045fcb06ac11eb","children":[{"id":"c7929b7ab2a246e89694c4596122bd4f","parentId":"3fd0313d9fb3455f9e3143a642a1e621","children":null,"name":"采购订单详情","sort":1,"parentIds":"0,,1,5eb044afc25d4349a3045fcb06ac11eb,3fd0313d9fb3455f9e3143a642a1e621","href":"/srm/supply/purchase/detail","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"采购订单","sort":10,"parentIds":"0,,1,5eb044afc25d4349a3045fcb06ac11eb","href":"/srm/supply/purchase/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"62e632b760344eb7ae5caa3ce2fbba69","parentId":"5eb044afc25d4349a3045fcb06ac11eb","children":[{"id":"8859fb6b1dce4c7eb6ab2dc22cf3f12a","parentId":"62e632b760344eb7ae5caa3ce2fbba69","children":null,"name":"入库订单详情","sort":1,"parentIds":"0,,1,5eb044afc25d4349a3045fcb06ac11eb,62e632b760344eb7ae5caa3ce2fbba69","href":"/srm/supply/stock-in/detail","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"入库订单","sort":20,"parentIds":"0,,1,5eb044afc25d4349a3045fcb06ac11eb","href":"/srm/supply/stock-in/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"230c4dd82db042db9341ad64ce458661","parentId":"5eb044afc25d4349a3045fcb06ac11eb","children":[{"id":"968f7a43208f475f93dbdc64d72aaf88","parentId":"230c4dd82db042db9341ad64ce458661","children":null,"name":"采退订单详情","sort":1,"parentIds":"0,,1,5eb044afc25d4349a3045fcb06ac11eb,230c4dd82db042db9341ad64ce458661","href":"/srm/supply/withdrawal/detail","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"采退订单","sort":30,"parentIds":"0,,1,5eb044afc25d4349a3045fcb06ac11eb","href":"/srm/supply/withdrawal/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"供货管理","sort":300,"parentIds":"0,,1","href":"/srm/supply","target":null,"icon":"el-icon-s-management","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"416784583fd64266ab5aa3108de2afb2","parentId":"10000","children":[{"id":"0b02ac9ca0464dbcbff6bbb9c815da24","parentId":"416784583fd64266ab5aa3108de2afb2","children":[{"id":"2e8605a7f6d24bae989b87b94617f3c4","parentId":"0b02ac9ca0464dbcbff6bbb9c815da24","children":null,"name":"订单满足率","sort":1,"parentIds":"0,,1,416784583fd64266ab5aa3108de2afb2,0b02ac9ca0464dbcbff6bbb9c815da24","href":"/srm/dataManagement/orderRate","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0},{"id":"c68b52544b32497caa5aadf0c46905c3","parentId":"0b02ac9ca0464dbcbff6bbb9c815da24","children":null,"name":"到货及时率","sort":1,"parentIds":"0,,1,416784583fd64266ab5aa3108de2afb2,0b02ac9ca0464dbcbff6bbb9c815da24","href":"/srm/dataManagement/arrivalRate","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"绩效数据","sort":1,"parentIds":"0,,1,416784583fd64266ab5aa3108de2afb2","href":"/srm/dataManagement/performance","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"数据管理","sort":400,"parentIds":"0,,1","href":"/srm/dataManagement","target":null,"icon":"el-icon-s-data","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"8c969773e10e4733b90e4732b830e5cc","parentId":"10000","children":[{"id":"cd92ccd60e184a378685dbedc57516ce","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"采购结算周期","sort":10,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseCycle","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"1b5b798ab61e4bfa83e13c126a8952f7","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"采购入库对账","sort":20,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseIn","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"ae3d95229bb644df92572924acaab9aa","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"采退出库对账","sort":30,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseOut","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"accaaf582fe24c6b856f0f1d64eea741","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"特殊扣款对账","sort":40,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/deduction","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"4fc1ae95f6d34ce09076f0c62f5ad4fd","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"采购调整对账","sort":50,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseAdjust","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"fe0ca6e3579345489cbb7419f928b503","parentId":"8c969773e10e4733b90e4732b830e5cc","children":[{"id":"32e38d8ddc874201ba9c6e88ce13ac4c","parentId":"fe0ca6e3579345489cbb7419f928b503","children":null,"name":"账单详情","sort":1,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc,fe0ca6e3579345489cbb7419f928b503","href":"/srm/settlement/purchaseBill/detail","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0},{"id":"dc93bc1cdbb545559cd7674c291d790d","parentId":"fe0ca6e3579345489cbb7419f928b503","children":null,"name":"账单首页","sort":1,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc,fe0ca6e3579345489cbb7419f928b503","href":"/srm/settlement/purchaseBill","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0},{"id":"e133df1c8d78491e9bfe6daba66cf5ec","parentId":"fe0ca6e3579345489cbb7419f928b503","children":null,"name":"发票录入","sort":1,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc,fe0ca6e3579345489cbb7419f928b503","href":"/srm/settlement/purchaseBill/invoice","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"采购结算账单","sort":60,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseBill","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"97fe2933679e427aa260c80ccad6ca43","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"一件代发采购入库明细","sort":70,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseInPP","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"25d1686f9bec4308b8bf8c5afdfa405a","parentId":"8c969773e10e4733b90e4732b830e5cc","children":null,"name":"一件代发售后退款明细","sort":80,"parentIds":"0,,1,8c969773e10e4733b90e4732b830e5cc","href":"/srm/settlement/purchaseOutPP","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"对账结算","sort":500,"parentIds":"0,,1","href":"/srm/settlement","target":null,"icon":"el-icon-s-order","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"9566d2ef1002434e8d0333f1e024fb4c","parentId":"10000","children":[{"id":"0291c5fcf36b410b89388e791affd753","parentId":"9566d2ef1002434e8d0333f1e024fb4c","children":[{"id":"1cc0b2b7614145d5be6f7a31a550cd01","parentId":"0291c5fcf36b410b89388e791affd753","children":null,"name":"商品列表","sort":1,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c,0291c5fcf36b410b89388e791affd753","href":"/srm/goodsManagement/goodsList","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"商品管理","sort":1,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c","href":"/srm/goodsManagement","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"037cde60113546608dd53c2555bd7ac6","parentId":"9566d2ef1002434e8d0333f1e024fb4c","children":[{"id":"098ca8beabe743cda3880ca0458b679a","parentId":"037cde60113546608dd53c2555bd7ac6","children":null,"name":"订单列表","sort":1,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c,037cde60113546608dd53c2555bd7ac6","href":"/srm/orderManagement/orderList","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"ef47c15553674837989415a3706380a8","parentId":"037cde60113546608dd53c2555bd7ac6","children":null,"name":"异常订单","sort":1,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c,037cde60113546608dd53c2555bd7ac6","href":"/srm/orderManagement/errorOrder","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"fa6240b823fb4a72ae9952ea677427c9","parentId":"037cde60113546608dd53c2555bd7ac6","children":null,"name":"超时订单","sort":1,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c,037cde60113546608dd53c2555bd7ac6","href":"/srm/orderManagement/outTimeOrder","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"订单管理","sort":1,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c","href":"/srm/orderManagement/","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"aae9bec9b55e432b9a950dd8237d20a6","parentId":"9566d2ef1002434e8d0333f1e024fb4c","children":null,"name":"售后管理","sort":30,"parentIds":"0,,1,9566d2ef1002434e8d0333f1e024fb4c","href":"/srm/openplatform/refund/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"厂家直发","sort":3080,"parentIds":"0,,1","href":"/srm/","target":null,"icon":"el-icon-s-shop","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"21a58062aff947628bf070f194d3bfeb","parentId":"10000","children":[{"id":"014b568eea204be2a701ff5ac357df7c","parentId":"21a58062aff947628bf070f194d3bfeb","children":null,"name":"下载文档","sort":1,"parentIds":"0,,1,21a58062aff947628bf070f194d3bfeb","href":"/srm/help/download","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"操作指南","sort":4000,"parentIds":"0,,1","href":"/srm/help","target":null,"icon":"el-icon-s-help","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"3dd722cc01954d089318437f8ac38006","parentId":"10000","children":[{"id":"20c6d35b58284615bcdf8ab1924700aa","parentId":"3dd722cc01954d089318437f8ac38006","children":[{"id":"666ea558037a4fedb3b89154905b9161","parentId":"20c6d35b58284615bcdf8ab1924700aa","children":null,"name":"用户详情","sort":1,"parentIds":"0,,1,3dd722cc01954d089318437f8ac38006,20c6d35b58284615bcdf8ab1924700aa","href":"/srm/system/user/detail","target":null,"icon":"","isShow":"0","permission":"","method":"GET","open":0,"type":0}],"name":"用户管理","sort":10,"parentIds":"0,,1,3dd722cc01954d089318437f8ac38006","href":"/srm/system/user/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"8071e970fd7f46868864308b865301b1","parentId":"3dd722cc01954d089318437f8ac38006","children":null,"name":"菜单管理","sort":20,"parentIds":"0,,1,3dd722cc01954d089318437f8ac38006","href":"/srm/system/menu/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"36fa0b7fbf09481992d3f50043d31084","parentId":"3dd722cc01954d089318437f8ac38006","children":null,"name":"角色管理","sort":30,"parentIds":"0,,1,3dd722cc01954d089318437f8ac38006","href":"/srm/system/role/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0},{"id":"6f8f84ecd151435fbc8bf983c228b391","parentId":"3dd722cc01954d089318437f8ac38006","children":null,"name":"字典管理","sort":40,"parentIds":"0,,1,3dd722cc01954d089318437f8ac38006","href":"/srm/system/dict/list","target":null,"icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0}],"name":"系统设置","sort":4000,"parentIds":"0,,1","href":"/srm/system","target":null,"icon":"el-icon-s-home","isShow":"1","permission":"","method":"GET","open":0,"type":0}]}

export const menuDetail = {"code":200,"message":"操作成功","result":{"id":"9566d2ef1002434e8d0333f1e024fb4c","name":"厂家直发","sort":3080,"parentIds":"0,,1","href":"/srm/","target":null,"icon":"el-icon-s-shop","isShow":"1","permission":"","method":"GET","open":0,"type":0,"parent":{"id":"10000","name":"功能菜单","sort":0,"parentIds":"9999,","href":"","target":"","icon":"","isShow":"1","permission":"","method":"GET","open":0,"type":0,"parent":null}}}
