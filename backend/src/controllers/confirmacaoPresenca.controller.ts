import { Request, Response, NextFunction } from "express";
import { ConfirmacaoPresencaService } from "../services/confirmacaoPresenca.service";

const confirmacaoPresencaService = new ConfirmacaoPresencaService();

export class ConfirmacaoPresencaController {

  /**
   * GET /confirmacoes
   */
  async listar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

          const { page, limit, eventoId, usuarioIdentificador, sort, order } = req.query;


      const confirmacoes = await confirmacaoPresencaService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        eventoId: eventoId ? Number(eventoId) : undefined,
        usuarioIdentificador: usuarioIdentificador as string,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(confirmacoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /confirmacoes/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const confirmacao =
        await confirmacaoPresencaService.buscar(id);

      res.status(200).json(confirmacao);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /confirmacoes
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const confirmacao =
        await confirmacaoPresencaService.criar(req.body);

      res.status(201).json({
        message: "Presença confirmada com sucesso.",
        data: confirmacao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /confirmacoes/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await confirmacaoPresencaService.excluir(id);

      res.status(200).json({
        message: "Confirmação removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /confirmacoes/evento/:eventoId
   */
  async listarPorEvento(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const eventoId = Number(req.params.eventoId);

      const confirmacoes =
        await confirmacaoPresencaService.listarPorEvento(eventoId);

      res.status(200).json(confirmacoes);

    } catch (error) {
      next(error);
    }
  }


  /**
   * GET /confirmacoes/evento/:eventoId/quantidade
   */
  async quantidadePorEvento(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const eventoId = Number(req.params.eventoId);

      const quantidade =
        await confirmacaoPresencaService.quantidadePorEvento(eventoId);

      res.status(200).json(quantidade);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /confirmacoes/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await confirmacaoPresencaService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}