import prisma from "../config/database";
interface ListarParams {
  page: number;
  limit: number;
  eventoId?: number;
  usuarioIdentificador?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class ConfirmacaoPresencaService {

  async listar(params: ListarParams) {
    const { page, limit, eventoId, usuarioIdentificador, sort, order } = params;

    const where = {
      ...(eventoId ? { eventoId } : {}),
      ...(usuarioIdentificador ? { usuarioIdentificador } : {}),
    };

    const [data, total] = await Promise.all([
      prisma.confirmacaoPresenca.findMany({
        where,
        include: { evento: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { confirmadoEm: "desc" },
      }),
      prisma.confirmacaoPresenca.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.confirmacaoPresenca.findUniqueOrThrow({ where: { id } });
  }

  async criar(data: { eventoId: number; usuarioIdentificador: string }) {
    return prisma.confirmacaoPresenca.create({ data });
  }

  async excluir(id: number) {
    return prisma.confirmacaoPresenca.delete({ where: { id } });
  }

  async listarPorEvento(eventoId: number) {
    return prisma.confirmacaoPresenca.findMany({ where: { eventoId } });
  }

  async quantidadePorEvento(eventoId: number) {
    const quantidade = await prisma.confirmacaoPresenca.count({
      where: { eventoId },
    });
    return { eventoId, quantidade };
  }

  async estatisticas() {
    const total = await prisma.confirmacaoPresenca.count();
    return { total };
  }
}