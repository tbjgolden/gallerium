module.exports = {
  title: 'gallerium',
  tagline: 'Responsive gallery logic',
  url: 'https://tbjgolden.github.io',
  baseUrl: '/gallerium/',
  favicon: 'img/favicon.ico',
  organizationName: 'tbjgolden',
  projectName: 'gallerium',
  themeConfig: {
    navbar: {
      title: 'gallerium',
      logo: {
        alt: 'gallerium logo',
        src: 'img/logo.svg'
      },
      links: [
        {
          to: 'docs/doc1',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        { to: 'docs/api/index', label: 'API', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href:
            'https://github.com/tbjgolden/gallerium',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1'
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/gallerium'
            }
            /*
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/gallerium',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/gallerium',
            },
            */
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href:
                'https://github.com/tbjgolden/gallerium'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} gallerium (Tom Golden). Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar'),
          editUrl:
            'https://github.com/tbjgolden/gallerium/edit/master/website/'
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/tbjgolden/gallerium/edit/master/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
