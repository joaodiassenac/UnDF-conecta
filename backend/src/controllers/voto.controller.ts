import { Request, Response, NextFunction } from "express";
import { VotoService } from "../services/voto.service";

const votoService = new VotoService();

export class VotoController {

  /**
   * GET /votos
   */
  async listar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const {
        page,
        limit,
        postId,
        usuarioId,
        sort,
        order
      } = req.query;

      const votos = await votoService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        postId: postId ? Number(postId) : undefined,
        usuarioId: usuarioId ? Number(usuarioId) : undefined,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(votos);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /votos/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const voto = await votoService.buscar(id);

      res.status(200).json(voto);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /votos
   * {
   *   "postId": 1,
   *   "usuarioId": 5
   * }
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const voto = await votoService.criar(req.body);

      res.status(201).json({
        message: "Curtida registrada com sucesso.",
        data: voto
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /votos/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await votoService.excluir(id);

      res.status(200).json({
        message: "Curtida removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /votos/post/:postId/usuario/:usuarioId
   */
  async removerCurtida(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const postId = Number(req.params.postId);
      const usuarioId = Number(req.params.usuarioId);

      await votoService.removerCurtida(postId, usuarioId);

      res.status(200).json({
        message: "Curtida removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /votos/post/:postId
   */
  async listarPorPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const postId = Number(req.params.postId);

      const votos = await votoService.listarPorPost(postId);

      res.status(200).json(votos);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /votos/usuario/:usuarioId
   */
  async listarPorUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const usuarioId = Number(req.params.usuarioId);

      const votos =
        await votoService.listarPorUsuario(usuarioId);

      res.status(200).json(votos);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /votos/post/:postId/quantidade
   */
  async quantidadePorPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const postId = Number(req.params.postId);

      const quantidade =
        await votoService.quantidadePorPost(postId);

      res.status(200).json(quantidade);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /votos/post/:postId/usuario/:usuarioId
   * Verifica se o usuário já curtiu a publicação
   */
  async verificarCurtida(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const postId = Number(req.params.postId);
      const usuarioId = Number(req.params.usuarioId);

      const curtido =
        await votoService.verificarCurtida(postId, usuarioId);

      res.status(200).json({
        curtido
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /votos/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await votoService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}