# Instruções para Deploy do Site Quantum Explorer no GitHub Pages

Este documento fornece instruções detalhadas para publicar o site Quantum Explorer no GitHub Pages. Siga os passos abaixo para colocar seu site online.

## Pré-requisitos

- Uma conta no GitHub
- Git instalado em seu computador (opcional, pois você também pode fazer upload diretamente pelo navegador)

## Opção 1: Deploy via Interface Web do GitHub (Mais Simples)

1. **Crie um novo repositório no GitHub**
   - Acesse [github.com](https://github.com) e faça login em sua conta
   - Clique no botão "+" no canto superior direito e selecione "New repository"
   - Nomeie o repositório como `Quantum-Explorer` (ou outro nome de sua preferência)
   - Deixe o repositório como público
   - Clique em "Create repository"

2. **Faça upload dos arquivos**
   - Na página do repositório recém-criado, clique no link "uploading an existing file"
   - Arraste todos os arquivos e pastas do site (extraídos do arquivo ZIP que você recebeu) para a área de upload
   - Adicione uma mensagem de commit como "Initial commit - Quantum Explorer site"
   - Clique em "Commit changes"

3. **Configure o GitHub Pages**
   - Na página do repositório, vá para "Settings" (aba de configurações)
   - Role para baixo até encontrar a seção "GitHub Pages"
   - Em "Source", selecione "main" (ou "master") como branch e "/" (root) como pasta
   - Clique em "Save"
   - Aguarde alguns minutos para que o GitHub Pages publique seu site
   - O GitHub fornecerá um URL (geralmente no formato `https://seu-usuario.github.io/Quantum-Explorer/`)

## Opção 2: Deploy via Linha de Comando (Para Usuários Avançados)

1. **Crie um novo repositório no GitHub** (como descrito na Opção 1)

2. **Clone o repositório para sua máquina local**
   ```bash
   git clone https://github.com/seu-usuario/Quantum-Explorer.git
   cd Quantum-Explorer
   ```

3. **Copie os arquivos do site para a pasta do repositório**
   - Extraia o arquivo ZIP que você recebeu
   - Copie todos os arquivos e pastas para a pasta do repositório

4. **Faça commit e push das alterações**
   ```bash
   git add .
   git commit -m "Initial commit - Quantum Explorer site"
   git push origin main
   ```

5. **Configure o GitHub Pages** (como descrito na Opção 1)

## Estrutura de Arquivos

Certifique-se de que a estrutura de arquivos no GitHub seja a seguinte:

```
/
├── index.html
├── assets/
│   ├── logo.jpg
│   ├── og-image.jpg
│   └── favicon.ico
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── particles.min.js
│   └── particles-config.json
└── pages/
    ├── fundamentos.html
    ├── computacao.html
    ├── quiz.html
    ├── recursos.html
    ├── sobre.html
    ├── contato.html
    └── ... (outras páginas)
```

## Verificação

Após o deploy, acesse o URL fornecido pelo GitHub Pages para verificar se o site está funcionando corretamente. Verifique:

- Se todas as páginas estão carregando
- Se as imagens estão sendo exibidas
- Se as simulações interativas estão funcionando
- Se o site está responsivo (teste em diferentes tamanhos de tela)

## Solução de Problemas Comuns

1. **Imagens não aparecem**: Verifique se os caminhos para as imagens estão corretos. Os caminhos devem ser relativos à raiz do site.

2. **Páginas não encontradas**: Certifique-se de que os links entre as páginas estão corretos e que todas as páginas foram carregadas no repositório.

3. **Problemas com CSS ou JavaScript**: Verifique se todos os arquivos CSS e JavaScript foram carregados e se os caminhos nos arquivos HTML estão corretos.

4. **Tempo de publicação**: O GitHub Pages pode levar alguns minutos para publicar seu site após o commit. Seja paciente e verifique novamente após alguns minutos.

## Personalização Adicional

Você pode personalizar ainda mais seu site:

- **Domínio personalizado**: Nas configurações do GitHub Pages, você pode configurar um domínio personalizado se possuir um.
- **Conteúdo**: Edite os arquivos HTML para atualizar o conteúdo conforme necessário.
- **Estilo**: Modifique o arquivo CSS para alterar a aparência do site.

## Suporte

Se encontrar algum problema durante o processo de deploy, consulte a [documentação oficial do GitHub Pages](https://docs.github.com/en/pages) ou entre em contato para obter assistência adicional.

---

Boa sorte com seu novo site Quantum Explorer! Esperamos que ele seja uma ferramenta valiosa para o ensino de física quântica para estudantes.
