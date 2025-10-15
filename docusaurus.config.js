// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Giantess Play",
  tagline: "Roguelite GTS 3D Shooting, play Giantess or Little Man",

  // url: 'https://gts-play-website-u771.4everland.app/',
  // url: 'https://meta3d-local-9gacdhjl439cff76-1302358347.tcloudbaseapp.com/',
  url: 'https://www.gts-play.cn/',

  // baseUrl: '/',
  baseUrl: '/website/english/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Giantess Play', // Usually your GitHub org/user name.
  // projectName: '巨大娘的玩耍-Website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            // href: 'https://meta3d-local-9gacdhjl439cff76-1302358347.tcloudbaseapp.com/gts_play_production/dist/index.html',
            href: 'https://www.gts-play.cn/',
            label: 'Enter Game',
          },
          // {
          //   type: 'doc',
          //   docId: '简介',
          //   position: 'left',
          //   label: '文档',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://discord.com/invite/JbhkqUJKFF',
            label: 'Forum',
          },
          {
            href: 'https://x.com/yang_yuanc14339',
            label: 'X(Twitter)',
          },
          //     {
          //       label: '交流加QQ群',
          //       href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QpNrLbhk5TZD8bg_sNalLrAKHVS3qCD2&authKey=ePPMKFJ1H3OXMdRLXJlYKNdyMPoO%2Fh2FWzcxgx5LjtdqZGmKU5i5QbYbAZeZRoz%2F&noverify=0&group_code=892578345'
          // },
          // {
          //   href: 'https://www.zhihu.com/column/c_1521448592849649664',
          //   label: '博客',
          // },

          // {
          //   href: 'https://github.com/巨大娘的玩耍-Technology/巨大娘的玩耍',
          //   label: 'GitHub',
          //   position: 'right',
          //   className: 'header-github-link',
          //   'aria-label': 'GitHub repository',
          //   // position: 'right',
          // },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: '社区',
      //       items: [
      //         {
      //           label: '论坛',
      //           href: '',
      //         },
      //         {
      //           label: '交流加QQ群',
      //           href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QpNrLbhk5TZD8bg_sNalLrAKHVS3qCD2&authKey=ePPMKFJ1H3OXMdRLXJlYKNdyMPoO%2Fh2FWzcxgx5LjtdqZGmKU5i5QbYbAZeZRoz%2F&noverify=0&group_code=892578345'
      //         },
      //       ],
      //     }
      //     // {
      //     //   title: '更多',
      //     //   items: [
      //     //     {
      //     //       label: '开发者的知乎',
      //     //       href: 'https://www.zhihu.com/people/dreamforest-yyc',
      //     //     },
      //     //     {
      //     //       label: '开发者的博客',
      //     //       href: 'https://www.cnblogs.com/chaogex/',
      //     //     },
      //     //   ],
      //     // },
      //   ],
      //   // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
