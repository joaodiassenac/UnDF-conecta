package telas;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import componentes.*;

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
        
        Botao btn1 = new Botao(320, 260, 128, 313);
        btn1.addActionListener(e -> JOptionPane.showMessageDialog(this, "Botão 1 funcionando!"));
        labelFundo.add(btn1.getBotaoClicavel()); 

        Botao btn2 = new Botao(320, 260, 480, 313);
        btn2.addActionListener(e -> JOptionPane.showMessageDialog(this, "Botão 2 funcionando!"));
        labelFundo.add(btn2.getBotaoClicavel());

        Botao btn3 = new Botao(320, 260, 832, 313);
        btn3.addActionListener(e -> JOptionPane.showMessageDialog(this, "Botão 3 funcionando!"));
        labelFundo.add(btn3.getBotaoClicavel());
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