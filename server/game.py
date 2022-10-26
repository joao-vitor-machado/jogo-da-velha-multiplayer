class Tabuleiro:
    def __init__(self):
        self.tabuleiro = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
        self.contador_de_jogada = 0
        self.jogar_novamente = []
        self.jogadores = [-1, 1] # O e X
        
    def verificar_posicao(self, linha, coluna): #verifica se a posição está ocupada
        if self.tabuleiro[linha][coluna] != 0:
            return 1
        else:
            return 0

    def efetuarJogada(self, linha, coluna): # efetua a jogada caso a posição não esteja ocupada
        
        if self.verificar_posicao(linha, coluna) == 1:
            print("Célula ocupada")
            return
        if self.contador_de_jogada % 2 == 0:
            self.tabuleiro[linha][coluna] = -1
        else:
            self.tabuleiro[linha][coluna] = 1

        self.contador_de_jogada+=1
        
        return self.verificarVencedor() # esse é o retorno que está lá no server

    def verificarVencedor(self):
        
        #Primeira linha
        soma = 0
        for i in range(3):
            soma+=self.tabuleiro[0][i]
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Segunda linha
        soma = 0
        for i in range(3):
            soma+=self.tabuleiro[1][i]
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Terceira linha
        soma = 0
        for i in range(3):
            soma+=self.tabuleiro[2][i]
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Primeira coluna
        soma = 0
        for i in range(3):
            soma+=self.tabuleiro[i][0]
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Segunda coluna
        soma = 0
        for i in range(3):
            soma+=self.tabuleiro[i][1]
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Terceira coluna
        soma = 0
        for i in range(3):
            soma+=self.tabuleiro[i][2]
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Diagonal da esquerda pra direita
        soma = 0
        soma = (self.tabuleiro[0][0] + self.tabuleiro[1][1] + self.tabuleiro[2][2])
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        #Diagonal da direita pra esquerda
        soma = 0
        soma = (self.tabuleiro[0][2] + self.tabuleiro[1][1] + self.tabuleiro[2][0])
        if soma == 3:
            return 1
        elif soma == -3:
            return -1

        if self.contador_de_jogada == 9:
            return 0

        return 100 # caso o jogo deva continuar


    def resetTabuleiro(self): # ainda estou trabalhando nisso
        self.tabuleiro = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
        self.contador_de_jogada = 0
        self.jogar_novamente.clear()