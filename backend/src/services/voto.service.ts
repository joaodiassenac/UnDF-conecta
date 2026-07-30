import prisma from "../config/database";

interface ListarParams {
  page: number;
  limit: number;
  postId?: number;
  usuarioIdentificador?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class VotoService {

  async listar(params: ListarParams) {
    const { page, limit, postId, sort, order } = params;

    const where = {
      ...(postId ? { postId } : {})
    };

    const [data, total] = await Promise.all([
      prisma.forumVote.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { criadoEm: "desc" },
      }),
      prisma.forumVote.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.forumVote.findUniqueOrThrow({ where: { id } });
  }

  async criar(data: { postId: number;}) {
    return prisma.forumVote.create({ data });
  }

  async excluir(id: number) {
    return prisma.forumVote.delete({ where: { id } });
  }

  async listarPorPost(postId: number) {
    return prisma.forumVote.findMany({ where: { postId } });
  }

  async quantidadePorPost(postId: number) {
    const quantidade = await prisma.forumVote.count({ where: { postId } });
    return { postId, quantidade };
  }

  async estatisticas() {
    const total = await prisma.forumVote.count();
    return { total };
  }
}