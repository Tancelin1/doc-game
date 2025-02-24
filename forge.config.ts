// ForgeConfig est défini comme any pour éviter l'erreur de type
type ForgeConfig = any;

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: 'MakerSquirrel',
      config: {
        authors: 'Tancelin Navez',
        description: 'application pour savoir dans quelle oeuvre apparait quelle personnage',
      },
    },
    {
      name: 'MakerZIP',
      config: {
        platforms: ['darwin'],
      },
    },
    {
      name: 'MakerRpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: 'VitePlugin',
      config: {
        build: [
          {
            entry: 'src/main.ts',
            config: 'vite.main.config.ts',
          },
          {
            entry: 'src/preload.ts',
            config: 'vite.preload.config.ts',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.ts',
          },
        ],
      },
    },
    {
      name: 'FusesPlugin',
      config: {
        version: 'FuseVersion.V1',
        options: {
          RunAsNode: false,
          EnableCookieEncryption: true,
          EnableNodeOptionsEnvironmentVariable: false,
          EnableNodeCliInspectArguments: false,
          EnableEmbeddedAsarIntegrityValidation: true,
          OnlyLoadAppFromAsar: true,
        },
      },
    },
  ],
};

export default config;
