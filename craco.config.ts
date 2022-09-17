export const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#e0b919',
                            '@font-size-base': '16px',
                            '@border-radius-base': '10px',
                            '@btn-primary-color': '#090909',
                            '@body-background': '#1a1325',
                            '@component-background': '#24163a',
                            '@table-header-bg': '#24163a',
                            '@table-row-hover-bg': '#301c4d',
                            '@table-selected-row-bg': '#301c4d'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};