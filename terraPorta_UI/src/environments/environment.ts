// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api_url: "http://192.168.1.204:8080/api",
  stripe_public_key: "pk_test_zdJN1dJ7hjSzKE2FFa4QzupK",
  iota_account: "nebojsa@bridgewaterlabs.com"
};
