import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components
import Dashnavbar from './Dashnavbar';
import Dashtopbar from './Dashtopbar';
import Dashinicio from './Dashinicio';
import Dashusuarios from './Dashusuarios';
import Dashreportes from './Dashreportes';
import Dashpreguntas from './Dashpreguntas';
import Dashsesiones from './Dashsesiones';

export class Dashboard extends Component {
    render() {
        return (
            <div id='wrapper'>
                <Dashnavbar />
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        <Dashtopbar />
                        <Router>
                            <Switch>
                                <Route exact path='/' component={Dashinicio} />
                                <Route exact path='/dashboard' component={Dashinicio} />
                                <Route exact path='/dashboard/usuarios' component={Dashusuarios} />
                                <Route path='/dashboard/reportes' component={Dashreportes}/> 
                                <Route path='/dashboard/preguntas' component={Dashpreguntas}/>
                                <Route path='/dashboard/sesiones' component={Dashsesiones} />
                            </Switch>
                        </Router>

                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © Trash Consult 2021</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Dashboard;