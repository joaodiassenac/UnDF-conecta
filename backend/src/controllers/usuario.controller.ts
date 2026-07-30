import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/usuario.service";

const service = new UsuarioService();

export class UsuarioController {

    async listar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = await service.listar();
            return res.json(usuarios);
        } catch (error) {
            next(error);
        }
    }

    async buscar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await service.buscar(Number(req.params.id));
            return res.json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async criar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await service.criar(req.body);
            return res.status(201).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await service.atualizar(
                Number(req.params.id),
                req.body
            );

            return res.json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async excluir(req: Request, res: Response, next: NextFunction) {
        try {
            await service.excluir(Number(req.params.id));
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    /**
 * GET /usuarios/filtros
 * Exemplo:
 * /usuarios/filtros?page=1&limit=10&curso=ADS&campus=Ceilândia&role=ESTUDANTE&sort=nome&order=asc
 */
async listarComFiltros(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      page,
      limit,
      curso,
      campus,
      role,
      sort,
      order,
      nome,
    } = req.query;

    const usuarios = await usuarioService.listarComFiltros({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      curso: curso as string,
      campus: campus as string,
      role: role as string,
      nome: nome as string,
      sort: sort as string,
      order: order as "asc" | "desc",
    });

    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/matricula/:matricula
 */
async buscarPorMatricula(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { matricula } = req.params;

    const usuario = await usuarioService.buscarPorMatricula(matricula);

    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/curso/:curso
 */
async listarPorCurso(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { curso } = req.params;

    const usuarios = await usuarioService.listarPorCurso(curso);

    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/campus/:campus
 */
async listarPorCampus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { campus } = req.params;

    const usuarios = await usuarioService.listarPorCampus(campus);

    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/role/:role
 */
async listarPorRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { role } = req.params;

    const usuarios = await usuarioService.listarPorRole(role);

    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/:id/eventos
 */
async listarEventos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const eventos = await usuarioService.listarEventos(id);

    res.status(200).json(eventos);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/:id/presencas
 */
async listarPresencas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const presencas = await usuarioService.listarPresencas(id);

    res.status(200).json(presencas);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/:id/publicacoes
 */
async listarPublicacoes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const publicacoes = await usuarioService.listarPublicacoes(id);

    res.status(200).json(publicacoes);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/:id/comentarios
 */
async listarComentarios(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const comentarios = await usuarioService.listarComentarios(id);

    res.status(200).json(comentarios);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/:id/avaliacoes
 */
async listarAvaliacoes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const avaliacoes = await usuarioService.listarAvaliacoes(id);

    res.status(200).json(avaliacoes);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /usuarios/:id/dashboard
 */
async dashboard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const dashboard = await usuarioService.dashboard(id);

    res.status(200).json(dashboard);
  } catch (error) {
    next(error);
  }
}
}