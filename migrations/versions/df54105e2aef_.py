"""empty message

Revision ID: df54105e2aef
Revises: 941264a72f10
Create Date: 2023-08-28 18:26:20.998137

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df54105e2aef'
down_revision = '941264a72f10'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('lastname', sa.String(length=20), nullable=False),
    sa.Column('trophy', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('lastname'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('user_id')
    )
    op.drop_table('volunteer')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('volunteer',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('city', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('cip_code', sa.VARCHAR(length=10), autoincrement=False, nullable=False),
    sa.Column('phone', sa.VARCHAR(length=20), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(length=1000), autoincrement=False, nullable=False),
    sa.Column('availability', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='volunteer_pkey'),
    sa.UniqueConstraint('cip_code', name='volunteer_cip_code_key'),
    sa.UniqueConstraint('city', name='volunteer_city_key'),
    sa.UniqueConstraint('description', name='volunteer_description_key'),
    sa.UniqueConstraint('email', name='volunteer_email_key'),
    sa.UniqueConstraint('phone', name='volunteer_phone_key')
    )
    op.drop_table('people')
    # ### end Alembic commands ###
