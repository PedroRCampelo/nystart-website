# Logos dos clientes

Coloque aqui as logos exibidas no carrossel "Clientes atendidos".

## Formato e tamanho

| | |
|---|---|
| **Formato** | **SVG** (preferencial) ou **PNG com fundo transparente** |
| **Tamanho (PNG)** | **400 × 200 px** (proporção 2:1) |
| **Área da logo** | centralizada, ocupando até ~90% da largura **ou** ~70% da altura (o que atingir primeiro) |
| **Fundo** | transparente, sem fundo branco |
| **Peso** | até ~100 KB por arquivo |
| **Nome do arquivo** | minúsculas, sem acento nem espaço: `grupo-exemplo.png` |

Pode salvar a logo **colorida**: o site mostra todas em tons de cinza para
manter o conjunto uniforme, e revela as cores quando o visitante passa o mouse.

Dica: usar sempre o mesmo quadro de 400 × 200 px com a logo centralizada faz
todas aparecerem com o mesmo "peso" visual no carrossel. Logos muito
horizontais encostam nas laterais; logos quadradas/altas encostam em cima e embaixo.

## Como adicionar um cliente

1. Salve o arquivo nesta pasta, ex.: `assets/logos/grupo-exemplo.png`
2. Em `index.html`, na seção `#clientes`, acrescente uma linha dentro de `<ul class="marquee__group">`:

   ```html
   <li class="client"><img src="assets/logos/grupo-exemplo.png" alt="Grupo Exemplo" loading="lazy"></li>
   ```

3. Quando tiver as logos reais, apague as linhas com `client--placeholder`.

Não é preciso mexer em mais nada: o carrossel se ajusta sozinho a qualquer
quantidade de logos.
