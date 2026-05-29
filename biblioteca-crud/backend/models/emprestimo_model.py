class Emprestimo:

    def __init__(
        self,
        usuario_id,
        livro_id,
        data_emprestimo,
        data_devolucao,
        status
    ):

        self.usuario_id = usuario_id
        self.livro_id = livro_id
        self.data_emprestimo = data_emprestimo
        self.data_devolucao = data_devolucao
        self.status = status