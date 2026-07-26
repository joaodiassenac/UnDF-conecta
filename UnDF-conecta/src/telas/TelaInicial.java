package telas;

import java.awt.*;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import javax.swing.*;
import componentes.FrameJanela;

public class TelaInicial extends JPanel {
    private ImageIcon fundo;
    private JLabel labelFundo;

    public TelaInicial(FrameJanela frame) {
        setLayout(null);
        setBackground(Color.decode("#F8FAFC")); 

        fundo = new ImageIcon(TelaInicial.class.getResource("/assets/undf-conecta-home.png"));
        labelFundo = new JLabel(fundo);
        labelFundo.setLayout(null); 

      
        add(labelFundo);

    
        this.addComponentListener(new ComponentAdapter() {
            @Override
            public void componentResized(ComponentEvent e) {
                centralizarFundo();
            }
        });
    }

    private void centralizarFundo() {
        int larguraPainel = getWidth();
        int alturaPainel = getHeight();

        int larguraImagem = 1280;
        int alturaImagem = 720;

     
        int x = (larguraPainel - larguraImagem) / 2;
        int y = (alturaPainel - alturaImagem) / 2;

        labelFundo.setBounds(x, y, larguraImagem, alturaImagem);
        revalidate();
        repaint();
    }
}