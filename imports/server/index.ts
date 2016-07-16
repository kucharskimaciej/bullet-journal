/// <reference path="../../typings/index.d.ts" />
/// <reference path="../lib/speakingurl.d.ts" />
/// <reference path="../lib/service-configuration.d.ts" />
/// <reference path="../lib/maximum.computed-fields.d.ts" />
import './fixtures/service_configuration';
import './fixtures/posts';

import '../collections/users/computed_fields';
import '../collections/users/publish';

import '../collections/posts/methods';
import '../collections/posts/publish';
import '../collections/posts/hooks';

import './hooks/on_login';
import './hooks/on_create_user';

import './gamification';