
import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
const { Suspense, lazy } = React;

const Home = lazy(() => (import(/**webpackChukName:"home" */"../components/home/index")));
const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home
  }
];
const Routes = () => (
  <Suspense fallback={<i>loading...</i>}>
    <Switch>
      {
        routes.map(r => {
          const { path, exact, component } = r;
          console.log(r);
          const LazyComp = component;
          return (
            <Route key={r.path.toString()} exact={exact} path={path} component={LazyComp} />
          )
        })
      }
    </Switch>
  </Suspense>
)
export default Routes;