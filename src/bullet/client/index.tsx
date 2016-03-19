/// <reference path="../../../typings/browser.d.ts" />
/// <reference path='../../../lib/react-komposer.d.ts' />
import {render} from 'react-dom';
import {Bullet} from './components/bullet/component';

Meteor.startup(() => {
    render(<Bullet />, document.getElementById('app'));
});

