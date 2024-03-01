import * as Sentry from '@sentry/react-native';

import Config from 'react-native-config';
import { appVersion } from '../../constants/CommonConsstats';

const configureSentry = async (user: any) => {
    try {

        Sentry.init({
            dsn: Config.SENTRY_DSN,
            environment: Config.NODE_ENV,
            release: appVersion,
            sampleRate: 0.5, // Set the percentage of events to be sent (e.g., 0.5 for 50%)
            tracesSampleRate: 0.2,
            maxBreadcrumbs: 50, // Set the maximum number of breadcrumbs to be captured
            shutdownTimeout: 5000, //
        });
        if (user) {
            setSentryUserContext(user);
        }
    } catch (error) {
        console.error('Error configuring Sentry:', error);
    }
};

const captureException = (error: Error, options = {}): string => {
    return Sentry.captureException(error, options);
};

const captureMessage = (message: string, options = {}): void => {
    Sentry.captureMessage(message, options);
};


const setSentryUserContext = (user: any) => {
    Sentry.setUser({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
    });
};

export { configureSentry, setSentryUserContext, captureException, captureMessage };