export interface ZkbKillmail {
  killmail_id: number;
  zkb: {
    locationID: number;
    hash: string;
    fittedValue: number;
    droppedValue: number;
    destroyedValue: number;
    totalValue: number;
    points: number;
    npc: boolean;
    solo: boolean;
    awox: boolean;
  };
}

export interface ESIKillmail {
  attackers: {
    character_id: number;
    corporation_id: number;
    damage_done: number;
    faction_id: number;
    final_blow: boolean;
    security_status: number;
    ship_type_id: number;
    weapon_type_id: number;
  }[];
  killmail_id: number;
  killmail_time: string;
  solar_system_id: number;
  victim: {
    alliance_id: number;
    character_id: number;
    corporation_id: number;
    damage_taken: number;
    items?: {
      flag: number;
      item_type_id: number;
      quantity_dropped: number;
      singleton: number;
    }[];
    position: {
      x: number;
      y: number;
      z: number;
    };
    ship_type_id: number;
  };
}

export interface HashId {
  id: number;
  hash: string;
}

export interface IdTime {
  id: number;
  time: string;
}

export interface FormData {
  name: string;
  entityType: EntityType;
  onlyFreshData?: boolean;
}

export type EntityType = 'Character' | 'Corporation' | 'Alliance' | 'System';

export interface DropdownOptions {
  value: EntityType;
  label: EntityType;
}

export interface GetIdResponse {
  characters: { id: number; name: string }[];
  corporations: { id: number; name: string }[];
  alliances: { id: number; name: string }[];
  systems: { id: number; name: string }[];
}

export type KillDataType = 'kills' | 'losses' | 'w-space' | 'solo';
