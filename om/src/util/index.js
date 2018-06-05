export default {
    hintShow(that,info){
        that.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load fire',
                        props: {
                            type: 'load-c',
                            size: 18
                        }
                    }),
                    h('div', info ? info  : '正在操作中，请稍后...')

                ])
            }
        });
    },
    hintHide(that){
        that.$Spin.hide();
    }
}