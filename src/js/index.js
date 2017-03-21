/**
 * Created by tianzeng on 2017-03-16.
 */
import dva from 'dva';
import React from 'react';
import Root from './root';

import UserModel from './models/users';

const app = dva();

app.model(UserModel)

// 3. View


app.router(Root);

// 4. Start
app.start('#mainContainer')