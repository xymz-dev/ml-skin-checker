"""initial schema - ML Skin Checker

Revision ID: 001_initial
Revises: 
Create Date: 2026-07-23
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSONB, UUID

revision: str = '001_initial'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table('players',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('player_id', sa.String(), nullable=False),
        sa.Column('server_id', sa.String(), nullable=False),
        sa.Column('nickname', sa.String()),
        sa.Column('avatar_url', sa.String()),
        sa.Column('region', sa.String()),
        sa.Column('total_heroes', sa.Integer(), default=0),
        sa.Column('total_skins', sa.Integer(), default=0),
        sa.Column('last_updated', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint('player_id','server_id')
    )
    op.create_table('heroes',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('hero_id', sa.String(), unique=True),
        sa.Column('name', sa.String()),
        sa.Column('role', sa.String()),
        sa.Column('image_url', sa.String())
    )
    op.create_table('skins',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('skin_id', sa.String(), unique=True),
        sa.Column('hero_id', sa.String()),
        sa.Column('name', sa.String()),
        sa.Column('rarity', sa.String()),
        sa.Column('image_url', sa.String()),
        sa.Column('is_limited', sa.Integer(), default=0)
    )
    op.create_table('player_results',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('player_id_fk', sa.String()),
        sa.Column('data_json', JSONB),
        sa.Column('cached_at', sa.DateTime(timezone=True), server_default=sa.func.now())
    )
    op.create_table('history',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('player_id_input', sa.String()),
        sa.Column('server_id_input', sa.String()),
        sa.Column('nickname_snapshot', sa.String()),
        sa.Column('checked_at', sa.DateTime(timezone=True), server_default=sa.func.now())
    )

def downgrade() -> None:
    op.drop_table('history')
    op.drop_table('player_results')
    op.drop_table('skins')
    op.drop_table('heroes')
    op.drop_table('players')
