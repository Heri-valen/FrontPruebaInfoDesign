
use Info
GO
PRINT 'INICIA'
PRINT '         CREAR PROCEDIMIENTO ALMACENADO ObtenerHistoricoConsumos'
    GO

    IF EXISTS (SELECT object_id FROM sys.objects WHERE name = 'ObtenerHistoricoConsumos' AND type = 'P' )
     BEGIN
         DROP PROCEDURE ObtenerHistoricoConsumos
     END
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
    CREATE PROCEDURE ObtenerHistoricoConsumos
    @opcion INT,
    @fechaInicial DATE,
    @fechaFinal DATE
AS
BEGIN
    IF @opcion = 1
    BEGIN
        -- Consulta 1: Histórico Consumos por Tramos
        SELECT LineaNombre, SUM(Consumo) AS ConsumoTotal, SUM(Perdida) AS PerdidaTotal, SUM(Costo) AS CostoTotal
        FROM [dbo].[vwHistoricoConsumos]
        WHERE fecha BETWEEN @fechaInicial AND @fechaFinal
        GROUP BY LineaNombre;
    END
    ELSE IF @opcion = 2
    BEGIN
        -- Consulta 2: Histórico Consumos por Cliente (Residencial, Comercial, Industrial)
        SELECT NombreCliente, LineaNombre, SUM(Consumo) AS ConsumoTotal, SUM(Perdida) AS PerdidaTotal, SUM(Costo) AS CostoTotal
        FROM [dbo].[vwHistoricoConsumos]
        WHERE fecha BETWEEN @fechaInicial AND @fechaFinal
        GROUP BY NombreCliente, LineaNombre;
    END
    ELSE IF @opcion = 3
    BEGIN
        -- Consulta 3: Top 20 Peores Tramos/Cliente
        SELECT TOP 20 NombreCliente, LineaNombre, SUM(Perdida) AS PerdidaTotal
        FROM [dbo].[vwHistoricoConsumos]
        WHERE fecha BETWEEN @fechaInicial AND @fechaFinal
        GROUP BY NombreCliente, LineaNombre
        ORDER BY PerdidaTotal DESC;
    END
    ELSE
    BEGIN
        -- Opción inválida
        RAISERROR('Opción inválida. Por favor, seleccione una opción válida.', 16, 1);
    END
END

GO

PRINT ' se creo el procedimiento almacenado llamado [ObtenerHistoricoConsumos] correctamente.' 
PRINT '		FINALIZACION DE CREACION DE LOS STORE PROCEDURES'
PRINT '======================================================================================================='
PRINT 'FINALIZA SCRIPT'

