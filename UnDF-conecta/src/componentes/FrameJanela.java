package componentes;

import java.awt.*;

import javax.swing.*;

import telas.TelaInicial;

/*public class FrameJanela extends JFrame {

    public FrameJanela(){
        setTitle("UnDF conecta");
        setUndecorated(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        
       // setLocationRelativeTo(null);
        
     // 1. Permite que a janela seja redimensionada
        setResizable(true);

        // 2. Define o conteúdo inicial
        setContentPane(new TelaInicial(this));

        // 3. Maximiza a janela para ocupar a tela toda
        setExtendedState(JFrame.MAXIMIZED_BOTH);
        
       // setResizable(false);
        
        setContentPane(new TelaInicial(this));
        
        GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
        ge.getDefaultScreenDevice().setFullScreenWindow(this);

        
        
        //pack();

        setLocationRelativeTo(null);
        setVisible(true);
        this.setFocusable(true); 
        this.requestFocusInWindow();
        
        //Opção para deixar fechar a janela se apertar em ESC
        this.addKeyListener(new java.awt.event.KeyAdapter() {
            @Override
            public void keyPressed(java.awt.event.KeyEvent e) {
                if (e.getKeyCode() == java.awt.event.KeyEvent.VK_ESCAPE) {
                    System.exit(0);
                }
            }
        }); 
    }

    public void trocarTela(JPanel tela){
        setContentPane(tela);
        revalidate();
        repaint();
    }
}*/


public class FrameJanela extends JFrame {

    public FrameJanela() {
        setTitle("UnDF conecta");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setMinimumSize(new Dimension(1024, 576)); // (1280, 720) ou (1050, 576)

       
        ImageIcon iconeApp = new ImageIcon(getClass().getResource("/assets/favicon-container.png"));
        setIconImage(iconeApp.getImage());

     
        setContentPane(new TelaInicial(this));

        setExtendedState(JFrame.MAXIMIZED_BOTH);

        setVisible(true);
    }

    public void trocarTela(JPanel tela) {
        setContentPane(tela);
        revalidate();
        repaint();
    }
}
