import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Sentry from "@sentry/angular-ivy";
import { BrowserTracing } from "@sentry/tracing";

import { AppModule } from './app/app.module';
import { ENV, environment } from './environments/environment';


Sentry.init({
  environment:ENV.type,
  dsn: "[YOUR DSN URL HERE]",
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ["localhost", "https://yourserver.io/api"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  // beforeSend

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
