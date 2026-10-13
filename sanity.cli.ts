import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'c0om6t0e',
    dataset: 'production',
  },

  /** Deployed at https://tarosfish.sanity.studio — set here so `sanity deploy`
   *  never has to ask, and so the name cannot drift between machines. */
  studioHost: 'tarosfish',
  deployment: {
    /** The deployed studio app, so `sanity deploy` never prompts for it. */
    appId: 'qsawfwmvqhrhgs1dxq7d2f1w',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  /**
   * Generate TypeScript types for the website's GROQ queries.
   *
   * The site lives in a sibling folder, so the paths reach across to it: every
   * query there wrapped in `defineQuery()` gets a result type written into its
   * `sanity.types.ts`. Change a field here and the website stops compiling
   * rather than quietly rendering `undefined`.
   */
  typegen: {
    enabled: true,
    path: "../taros-fish-website-rebuild/src/**/*.{ts,tsx}",
    schema: 'schema.json',
    generates: "../taros-fish-website-rebuild/sanity.types.ts",
    overloadClientMethods: true,
  },
})
