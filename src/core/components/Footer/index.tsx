import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
  
function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="bg-brand-primary text-white py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Seção de Consultas Públicas */}
              <Card className=" border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-primary">Consultas Públicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-brand-primary mb-4">
                    Sua voz é importante! Participe das nossas consultas públicas e ajude a moldar o futuro.
                  </p>
                  <Button onClick={() => navigate("/home/public-consultation")} className="bg-brand-primary text-white hover:bg-brand-primary hover:opacity-80">
                    Ver Consultas Abertas
                  </Button>
                </CardContent>
              </Card>
    
              {/* Seção de Links Úteis */}
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-primary">Links Úteis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <a href="/sobre" className="text-brand-primary hover:text-gray-200">Sobre Nós</a>
                    </li>
                    <li>
                      <a href="/consultas" className="text-brand-primary hover:text-gray-200">Todas as Consultas</a>
                    </li>
                    <li>
                      <a href="/votacao" className="text-brand-primary hover:text-gray-200">Votação</a>
                    </li>
                    <li>
                      <a href="/faq" className="text-brand-primary hover:text-gray-200">FAQ</a>
                    </li>
                    <li>
                      <a href="/politica-privacidade" className="text-brand-primary hover:text-gray-200">Política de Privacidade</a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
    
              {/* Seção de Contato */}
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-primary">Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-brand-primary mb-4">Entre em contato conosco para mais informações:</p>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-envelope mr-2 text-brand-primary"></i>
                    <a href="mailto:contato@suaempresa.com" className="text-brand-primary hover:text-gray-200">gl.equipe@gmail.com</a>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-phone mr-2 text-brand-primary"></i>
                    <span className="text-brand-primary">Telefone: (28) 99950-5410</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-globe mr-2 text-brand-primary"></i>
                    <span className="text-brand-primary">https://github.com/GNobroga</span>
                  </div>
                </CardContent>
              </Card>
    
              {/* Seção de Redes Sociais */}
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-primary">Siga-nos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-brand-primary hover:text-brand-primary">
                      <i className="fab fa-facebook-square" style={{ fontSize: '24px' }}></i>
                    </a>
                    <a href="https://twitter.com" className="text-brand-primary hover:text-brand-primary">
                      <i className="fab fa-twitter-square" style={{ fontSize: '24px' }}></i>
                    </a>
                    <a href="https://instagram.com" className="text-brand-primary hover:text-brand-primary">
                      <i className="fab fa-instagram-square" style={{ fontSize: '24px' }}></i>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
    
            {/* Rodapé com Direitos Autorais */}
            <div className="text-center mt-10 border-t border-white pt-4">
              <p className="text-sm">
                © {new Date().getFullYear()} GLT. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      );
};

export default Footer;
