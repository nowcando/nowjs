
import { IProvider } from "../../core/index";
import { IDType, IQueryOptions, IQueryResult } from "../../data/index";
import { Claim, ClaimScope, ScopeClaim } from "./index";

export type ClaimScopePair<TClaim extends Claim> = [string, TClaim[]];
export interface IClaimProvider<TClaim extends Claim, TScope extends ClaimScope> extends IProvider {

        addScope(tenantID: IDType, app: string, scope: TScope): Promise<TScope>;
        updateScope(tenantID: IDType, app: string, scope: TScope): Promise<TScope>;
        removeScope(tenantID: IDType, app: string, scope: string): Promise<boolean>;
        getScopes(tenantID: IDType, app: string, ...scopes: string[]): Promise<TScope[]>;

}

export interface IUserClaimProvider<TClaim extends Claim,
        TScope extends ClaimScope> extends IClaimProvider<TClaim, TScope> {
        getUserClaims(tenantID: IDType, app: string, userid: IDType, scopes: string[],
                      ...types: string[]): Promise<Array<ScopeClaim<TClaim>>>;
        addUserClaim(tenantID: IDType, app: string, usersid: IDType, scope: string,
                     ...claims: TClaim[]): Promise<Array<ScopeClaim<TClaim>>>;
        updateUserClaim(tenantID: IDType, app: string, usersid: IDType, scope: string,
                        ...claims: TClaim[]): Promise<Array<ScopeClaim<TClaim>>>;
        removeUserClaim(tenantID: IDType, app: string, usersid: IDType, scope: string,
                        ...claims: TClaim[]): Promise<boolean>;
}
export interface IRoleClaimProvider<TClaim extends Claim,
        TScope extends ClaimScope> extends IClaimProvider<TClaim, TScope> {
        getRoleClaims(tenantID: IDType, app: string, role: string, scopes: string[],
                      ...types: string[]): Promise<Array<ScopeClaim<TClaim>>>;
        addRoleClaim(tenantID: IDType, app: string, role: string, scope: string,
                     ...claims: TClaim[]): Promise<Array<ScopeClaim<TClaim>>>;
        updateRoleClaim(tenantID: IDType, app: string, role: string, scope: string,
                        ...claims: TClaim[]): Promise<Array<ScopeClaim<TClaim>>>;
        removeRoleClaim(tenantID: IDType, app: string, role: string, scope: string,
                        ...claims: TClaim[]): Promise<boolean>;
}

export interface ITenantClaimProvider<TClaim extends Claim,
TScope extends ClaimScope> extends IClaimProvider<TClaim, TScope> {
        getTenantClaims(tenantID: IDType, app: string, scopes: string[],
                        ...types: string[]): Promise<Array<ScopeClaim<TClaim>>>;
        addTenantClaim(tenantID: IDType, app: string, scope: string,
                       ...claims: TClaim[]): Promise<Array<ScopeClaim<TClaim>>>;
        updateTenantClaim(tenantID: IDType, app: string, scope: string,
                          ...claims: TClaim[]): Promise<Array<ScopeClaim<TClaim>>>;
        removeTenantClaim(tenantID: IDType, app: string, scope: string,
                          ...claims: TClaim[]): Promise<boolean>;
}
