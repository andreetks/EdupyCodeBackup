import React, { Component } from 'react'

export class SobreNosotros extends Component {
    render() {
        return (
            <div className="row m-0 vh-100 align-items-center justify-content-center">
                <div className="card bg-light col-md-11 mb-auto p-5 text-center" style={{
                    margin: '3%',
                    borderRadius: '15px'
                }}>
                    <section className="about" id="about">
                        <div className="content">
                            <h3>Por qué elegir Edupy</h3>
                            <p>Edupy es una plataforma que aprovecha la tecnología y la comuniación eficaz para el aprendizaje y la tutoría dejando atrás la metodología tradicional ya obsoleta.</p>
                            {/* <a href="/#" type="button" className="btn btn-outline-secondary">Saber mas...</a> */}
                        </div>
                    </section>
                    <hr />
                    <section className="contact" id="contact">
                        <h1 className="heading">Contactanos</h1>
                        <div className="inner contact">

                            <div className="contact-form">

                                <form id="contact-us" action="#">

                                    <div className="col-xs-3 wow animated slideInLeft" data-wow-delay=".5s">

                                        <input type="text" name="name" id="name" required="required" className="form" placeholder="Nombre" />

                                        <input type="email" name="mail" id="mail" required="required" className="form" placeholder="Correo" />

                                        <input type="text" name="subject" id="subject" required="required" className="form" placeholder="Tema" />
                                    </div>

                                    <div className="col-xs-6 wow animated slideInRight" data-wow-delay=".5s">

                                        <textarea name="message" id="message" className="form textarea" placeholder="Mensaje"></textarea>
                                    </div>

                                    <div className="relative fullwidth col-xs-12">

                                        <button type="submit" id="submit" name="submit" className="btn btn-primary">Enviar Correo</button>
                                    </div>

                                </form>

                                <div className="mail-message-area">

                                    <div className="alert gray-bg mail-message not-visible-message">
                                        <strong>Gracias !</strong> Tu correo fue enviado.
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>
                </div>
            </div>
        )
    }
}

export default SobreNosotros;
