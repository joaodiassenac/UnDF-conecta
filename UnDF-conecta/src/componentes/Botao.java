package componentes;

import java.awt.Cursor;
import java.awt.event.ActionListener;
import javax.swing.ImageIcon;
import javax.swing.JButton;

public class Botao {
    private JButton botaoClicavel;

    public Botao(ImageIcon icone, int posicaoX, int posicaoY) {
        int largura = icone.getIconWidth();
        int altura = icone.getIconHeight();

        this.botaoClicavel = new JButton(icone);
        this.botaoClicavel.setBounds(posicaoX, posicaoY, largura, altura);
        configuracoesPadrao();
    }

    public Botao(int largura, int altura, int posicaoX, int posicaoY) {
        this.botaoClicavel = new JButton();
        this.botaoClicavel.setBounds(posicaoX, posicaoY, largura, altura);
        configuracoesPadrao();
    }


    private void configuracoesPadrao() {
        this.botaoClicavel.setBorderPainted(true);
        this.botaoClicavel.setContentAreaFilled(false);
        this.botaoClicavel.setFocusPainted(false);
        this.botaoClicavel.setOpaque(false);
        this.botaoClicavel.setCursor(new Cursor(Cursor.HAND_CURSOR));
    }

    public void addActionListener(ActionListener acao) {
        this.botaoClicavel.addActionListener(acao);
    }

    public JButton getBotaoClicavel() {
        return botaoClicavel;
    }
}