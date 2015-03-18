> Acessível em [mtdsousa.com](http://mtdsousa.github.io/blog/2014/10/04/desenhando-com-opengl-plus-lglut-em-c/).

Desenhando com OpenGL + lGlut em C
---

Instalando GLUT: `sudo apt-get install freeglut3-dev`

Exemplo de aplicação:

```c
#include <GL/glut.h>

// Drawing routine.
void drawScene(void){
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.0, 0.0, 0.0);

    // Draw a polygon with specified vertices.
    glBegin(GL_POLYGON);
        glVertex3f(20.0, 20.0, 0.0);
        glVertex3f(80.0, 20.0, 0.0);
        glVertex3f(80.0, 80.0, 0.0);
        glVertex3f(20.0, 80.0, 0.0);
    glEnd();
    glFlush();
}

// Initialization routine.
void setup(void){
    glClearColor(1.0, 1.0, 1.0, 0.0);
    glPolygonMode( GL_FRONT_AND_BACK, GL_LINE );
}

// OpenGL window reshape routine.
void resize(int w, int h){
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(0.0, 100.0, 0.0, 100.0, -1.0, 1.0);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

// Keyboard input processing routine.
void keyInput(unsigned char key, int x, int y){
    switch(key){
        case 27:
            exit(0);
            break;
        default:
            break;
    }
}

// Main routine.
int main(int argc, char **argv){
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGBA);
    glutInitWindowSize(500, 500);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("square.cpp");
    glutDisplayFunc(drawScene);
    glutReshapeFunc(resize);
    glutKeyboardFunc(keyInput);
    setup();
    glutMainLoop();
    return 0;
}
```
Para compilar: `gcc {programa}.c -o {nomedoprograma} -lglut`

**Referências:**

 - Debian Packages: [https://packages.debian.org/][1]
 - Principia Mathematica Inc: [http://www.prinmath.com/][2]
 - Flávio Coutinho, Computação Gráfica: [http://fegemo.github.io/][3]

[1]: https://packages.debian.org/wheezy/freeglut3-dev
[2]: http://www.prinmath.com/csci5229/misc/install.html
[3]: http://fegemo.github.io/cefet-cg/


