import {FlowRouter} from 'meteor/meteorhacks:flow-router';
import {render} from 'react-dom';

import {BulletLayout} from './components/layout/bullet';
import {Bullet} from './components/bullet/component';

const APPLICATION_ROOT_ID = 'app';
function renderRoot(jsx) {
    return render(jsx, document.getElementById(APPLICATION_ROOT_ID));
}

FlowRouter.route('/', {
    action() {
        renderRoot(<BulletLayout><Bullet /></BulletLayout>);
    }
});